import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ErrorFallback } from "./ErrorFallback";

const meta: Meta<typeof ErrorFallback> = {
  title: "Repo Radar/ErrorFallback",
  component: ErrorFallback,
  parameters: { layout: "fullscreen" },
  args: {
    onRetry: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ErrorFallback>;

export const Default: Story = {};

export const WithReportAction: Story = {
  args: {
    onReport: fn(),
  },
};

export const WithErrorDetails: Story = {
  args: {
    onReport: fn(),
    details: "TypeError: Cannot read properties of undefined (reading 'stargazersCount')",
  },
};
