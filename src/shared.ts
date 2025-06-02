export const TOKEN_URL = "https://accounts.spotify.com/api/token";

type UiCheckLoginType = {
  type: "check-login";
};
type UiLoginType = {
  type: "login";
  accessToken: string;
  refreshToken: string;
};
type UiLogoutType = {
  type: "logout";
};
type UiSetKeysType = {
  type: "set-keys";
  clientId: string;
};

export type UiMessageType =
  | UiCheckLoginType
  | UiLoginType
  | UiLogoutType
  | UiSetKeysType;

type LoginType = {
  type: "login";
};

type InfoType = {
  type: "info";
  origin: string;
  pluginId: string;
  clientId: string;
};

export type MessageType = LoginType | InfoType;

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};
