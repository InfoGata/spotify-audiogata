import ky from "ky";
import { MessageType, TOKEN_URL, TokenResponse, UiMessageType } from "./shared";
import { Button } from "./components/ui/button";
import { useState, useEffect } from "preact/hooks";
import { Input } from "./components/ui/input";

function generateRandomString() {
  var array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
}

function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

// Base64-urlencodes the input string
function base64urlencode(str: ArrayBuffer) {
  // Convert the ArrayBuffer to string using Uint8 array to convert to what btoa accepts.
  // btoa accepts chars only within ascii 0-255 and base64 encodes them.
  // Then convert the base64 encoded to base64url encoded
  //   (replace + with -, replace / with _, trim trailing =)
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(str))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function pkceChallengeFromVerifier(v: any) {
  const hashed = await sha256(v);
  return base64urlencode(hashed);
}

const sendMessage = (message: UiMessageType) => {
  parent.postMessage(message, "*");
};

const authorizeUrl = "https://accounts.spotify.com/authorize";
const redirectPath = "/login_popup.html";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [redirectUri, setRedirectUri] = useState("");
  const [clientId, setClientId] = useState("");
  const [pluginId, setPluginId] = useState("");

  useEffect(() => {
    const onMessage = (event: MessageEvent<MessageType>) => {
      switch (event.data.type) {
        case "info":
          setRedirectUri(event.data.origin + redirectPath);
          setPluginId(event.data.pluginId);
          setClientId(event.data.clientId);
          break;
        case "login":
          setIsSignedIn(true);
          break;
        default:
          const _exhaustive: never = event.data;
          break;
      }
    };

    sendMessage({ type: "check-login" });
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  async function getToken(url: URL, savedState: string, codeVerifier: string) {
    const code = url.searchParams.get("code") || "";
    const state = url.searchParams.get("state");
    if (savedState !== state) {
      return;
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("client_id", clientId);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", codeVerifier);
    const result = await ky.post<TokenResponse>(TOKEN_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }).json();
    return result;
  }

  const pkce = async () => {
    const state = { state: generateRandomString(), pluginId: pluginId };
    const stateStr = JSON.stringify(state);
    const codeVerifier = generateRandomString();
    const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);
    const scopes =
      "streaming user-read-email user-read-private user-top-read playlist-read-private";
    const url = new URL(authorizeUrl);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("scope", scopes);
    url.searchParams.append("state", stateStr);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("code_challenge", codeChallenge);
    url.searchParams.append("code_challenge_method", "S256");
    const newWindow = window.open(url);
    const onMessage = async (returnUrl: string) => {
      const url = new URL(returnUrl);
      newWindow?.close();
      const result = await getToken(url, stateStr, codeVerifier);
      if (!result) {
        return;
      }
      sendMessage({
        type: "login",
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
      });
      setIsSignedIn(true);
    };
    window.onmessage = async (event: MessageEvent) => {
      if (event.source === newWindow) {
        await onMessage(event.data.url);
      } else {
        if (event.data.type === "deeplink") {
          await onMessage(event.data.url);
        }
      }
    };
  };

  const onLogin = async () => {
    await pkce();
  };

  const onLogout = () => {
    setIsSignedIn(false);
    sendMessage({ type: "logout" });
  };

  const onSaveClientId = () => {
    sendMessage({
      type: "set-keys",
      clientId: clientId,
    });
  };

  const saveButtonText = "Save Client ID";

  return (
    <div className="flex">
      {isSignedIn ? (
        <div>
          <Button onClick={onLogout}>Logout</Button>
        </div>
      ) : (
        <div>
          <Button onClick={onLogin} disabled={!clientId}>
            Login
          </Button>
          <div>
            <Input
              placeholder="Client ID"
              value={clientId}
              onChange={(e: any) => {
                const value = (e.target as HTMLInputElement).value;
                setClientId(value);
              }}
            />
            <div>
              <Button onClick={onSaveClientId}>{saveButtonText}</Button>
            </div>
          </div>
          <p>Instructions:</p>
          <ol>
            <li>
              Browse to{" "}
              <a
                href="https://developer.spotify.com/dashboard/applications"
                target="_blank"
              >
                https://developer.spotify.com/dashboard/applications.
              </a>
            </li>
            <li>Log in with your Spotify account.</li>
            <li>Click on "Create an app".</li>
            <li>
              Pick an "App name" and "App description" of your choice and mark
              the checkboxes.
            </li>
            <li>After creation, Click "Settings"</li>
            <li>Add {redirectUri} to Redirect URIs and Save</li>
            <li>Find "Client ID"</li>
            <li>
              Copy "Client ID" and insert into Client ID into Text field above
              and click the "{saveButtonText}" Button
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default App;
