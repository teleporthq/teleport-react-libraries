import { propDefinitionsDecoder } from "@teleporthq/teleport-uidl-validator/dist/cjs/decoders/utils";
import {
  Decoder,
  object,
  string,
  array,
  optional,
  boolean,
  dict,
} from "@mojotech/json-type-validation";
import {
  NPMDependency,
  CDNDependency,
  Dependency,
  ThemeProviders,
  LibraryDefinition,
  ReactComponent,
} from "../types";

export const dependencyDecoder: Decoder<Dependency> = object({
  path: string(),
  version: optional(string()),
  meta: optional(
    object({
      namedImport: boolean(),
    })
  ),
});

export const npmDependencyDeocder: Decoder<NPMDependency> = object({
  dependency: dependencyDecoder,
  styles: array(string()),
});

export const cdnDependencyDeocder: Decoder<CDNDependency> = object({
  cdn: string(),
  dependency: dependencyDecoder,
  styles: array(string()),
});

export const themeprovidersDeocder: Decoder<ThemeProviders> = object({
  defaultTheme: string(),
  dependency: dependencyDecoder,
  attrs: optional(dict(dependencyDecoder)),
});

export const reactComponentDecoder: Decoder<ReactComponent> = object({
  name: string(),
  dependency: dependencyDecoder,
  props: dict(propDefinitionsDecoder),
});

const libraryDefinitionDecoder: Decoder<LibraryDefinition> = object({
  name: string(),
  isDesignSystem: boolean(),
  components: dict(reactComponentDecoder),
  npm: npmDependencyDeocder,
  cdn: cdnDependencyDeocder,
  peerDependencies: optional(dict(dependencyDecoder)),
});

export default libraryDefinitionDecoder;
