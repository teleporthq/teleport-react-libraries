export interface LibraryDefinition {
  name: string;
  slug: string;
  isDesignSystem: boolean;
  theme?: ThemeProviders;
  components: Record<string, ReactComponent>;
  npm: NPMDependency;
  cdn: NPMDependency;
  peerDependencies?: Record<string, Dependency>; // Only used when building project cdn's automatically resolve them
}

export interface ReactComponent {
  name: string;
  namedImport: boolean;
  hasChildElements: boolean;
  props?: Record<string, PropDefinition>;
}

export interface PropDefinition {
  propName: string;
  type: "string" | "number" | "boolean";
  defaultValue?: string | number | boolean;
  options?: string[] | number[];
  context: string;
}

export interface ThemeProviders {
  defaultTheme: string;
  attrs?: Record<string, Dependency>;
}

export interface Dependency {
  path: string;
  version: string;
  meta?: {
    namedImport: boolean;
  };
}

export interface NPMDependency {
  dependency: Dependency;
  styles?: string[];
}
