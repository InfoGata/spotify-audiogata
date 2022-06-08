import axios from "axios";
import { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { TOKEN_URL, CLIENT_ID } from "./shared";

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

const authorizeUrl = "https://accounts.spotify.com/authorize";
const redirectPath = "/login_popup.html";
const App: FunctionalComponent = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [redirectUri, setRedirectUri] = useState("");

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case "origin":
          setRedirectUri(event.data.value + redirectPath);
          break;
        case "login":
          setIsSignedIn(true);
          break;
      }
    };

    window.parent.postMessage("init", "*");
    window.addEventListener("message", onMessage);
    () => window.removeEventListener("message", onMessage);
  });

  async function getToken(url: URL, savedState: string, codeVerifier: string) {
    const code = url.searchParams.get("code") || "";
    const state = url.searchParams.get("state");
    if (savedState !== state) {
      return;
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("client_id", CLIENT_ID);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", codeVerifier);
    const result = await axios.post(TOKEN_URL, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return result.data;
  }

  const pkce = async () => {
    const state = generateRandomString();
    const codeVerifier = generateRandomString();
    const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);
    const scopes = "streaming user-read-email user-read-private user-top-read";
    const url = `${authorizeUrl}?response_type=code&client_id=${encodeURIComponent(
      CLIENT_ID
    )}&state=${encodeURIComponent(state)}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&code_challenge=${encodeURIComponent(
      codeChallenge
    )}&code_challenge_method=S256`;
    const newWindow = window.open(url);
    const onMessage = async (returnUrl: string) => {
      const url = new URL(returnUrl);
      newWindow?.close();
      const result = await getToken(url, state, codeVerifier);
      window.parent.postMessage(result, "*");
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
  };

  return (
    <>
      {isSignedIn ? (
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </>
  );
};

export default App;
