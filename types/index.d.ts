
declare module "coveralls" {
  export function handleInput(input: string, cb: (err?: any) => void): void;
}

declare module "version-exists" {
  export default function versionExists(name: string, version: string): Promise<boolean>;
}
