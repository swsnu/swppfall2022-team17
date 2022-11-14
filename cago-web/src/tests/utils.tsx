import { render, RenderOptions } from "@testing-library/react";
import { SWRConfig } from "swr";

const TestProvider = ({ children }: { children: React.ReactElement }) => {
  return <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrappers">) =>
  render(ui, { wrapper: TestProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
