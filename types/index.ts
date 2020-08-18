import { UIDLPropDefinition } from "@teleporthq/teleport-types";

export interface LibraryDefinition {
  name: string;
  isDesignSystem: boolean;
  components: Record<string, ReactComponent>;
  npm: NPMDependency;
  cdn: CDNDependency;
  peerDependencies?: Record<string, Dependency>; // Only used when building project cdn's automatically resolve them
}

export interface ReactComponent {
  name: string;
  dependency: Dependency;
  props: Record<string, UIDLPropDefinition>;
}

export interface ThemeProviders {
  defaultTheme: string;
  dependency: Dependency;
  attrs?: Record<string, Dependency>;
}

export interface Dependency {
  path: string;
  version?: string;
  meta?: {
    namedImport: boolean;
  };
}

export interface NPMDependency {
  dependency: Dependency;
  styles?: string[];
}

export interface CDNDependency extends NPMDependency {
  cdn: string; // skypack.dev jspm.io
}
