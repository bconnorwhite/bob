
declare module "version-exists" {
  export default function versionExists(name: string, version: string): Promise<boolean>;
}
