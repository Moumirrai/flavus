declare module 'flavus-api' {
  export interface APIEndpoint {
    path: string;
    execute: (
      client: import('../../struct/Core').Core,
      req: import('express').Request,
      res: import('express').Response
    ) => Promise<unknown>;
  }

  export interface Room {
    id: string;
    members: string[];
    interval: Timer | null;
  }

  export interface AuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  }

  export interface SocketEvent {
    name: string;
    rateLimit: {
      points: number;
      duration: number;
    };
    execute: (
      client: import('../../struct/Core').Core,
      io: import('socket.io').Socket,
      data: unknown
    ) => Promise<unknown>;
  }

  export interface UserInterface {
    id: string;
    username: string;
    avatar: string;
    avatar_decoration: any;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: any;
    banner_color: any;
    accent_color: any;
    locale: string;
    mfa_enabled: boolean;
    guilds: userGuilds;
  }

  export interface userGuilds {
    active: {
      id: string;
      name: string;
      icon: string;
      owner: boolean;
      permissions: number;
      features: string[];
    }[],
    notActive: {
      id: string;
      name: string;
      icon: string;
      owner: boolean;
      permissions: number;
      features: string[];
    }[]
  }

  export interface APIInterface {
    readonly EndPoints: Collection<string, APIEndpoint>;
    readonly SocketEvents: Collection<string, SocketEvent>;
  }

  export interface ResultHandlerInterface {
    type: 'TRACK' | 'PLAYLIST';
    tracks: { title: string; author: string; duration: number; uri: string }[];
    playlistName?: string;
    nowPlaying?: boolean;
    error?: boolean;
  }
}
