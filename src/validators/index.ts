import {
  Decoder,
  object,
  string,
  array,
  optional,
  boolean,
  dict,
  union,
  constant,
  number,
} from "@mojotech/json-type-validation";
import {
  NPMDependency,
  CDNDependency,
  Dependency,
  ThemeProviders,
  LibraryDefinition,
  ReactComponent,
  PropDefinition,
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
  styles: optional(array(string())),
});

export const cdnDependencyDeocder: Decoder<CDNDependency> = object({
  cdn: string(),
  dependency: dependencyDecoder,
  styles: optional(array(string())),
});

export const themeprovidersDeocder: Decoder<ThemeProviders> = object({
  defaultTheme: string(),
  attrs: optional(dict(dependencyDecoder)),
});

export const propDefinitionDecoder: Decoder<PropDefinition> = object({
  propName: string(),
  type: union(constant("string"), constant("number"), constant("boolean")),
  defaultValue: optional(union(string(), number(), boolean())),
  options: optional(union(array(string()), array(number()))),
  context: string(),
});

export const reactComponentDecoder: Decoder<ReactComponent> = object({
  name: string(),
  namedImport: boolean(),
  hasChildElements: boolean(),
  props: optional(dict(propDefinitionDecoder)),
});

const libraryDefinitionDecoder: Decoder<LibraryDefinition> = object({
  name: string(),
  slug: string(),
  isDesignSystem: boolean(),
  theme: optional(themeprovidersDeocder),
  components: dict(reactComponentDecoder),
  npm: npmDependencyDeocder,
  cdn: cdnDependencyDeocder,
  peerDependencies: optional(dict(dependencyDecoder)),
});

export default libraryDefinitionDecoder;
