import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Repo Radar/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoTrackedRepos: Story = {
  name: "No tracked repos (as used in TrackedReposSection)",
  args: {
    title: "No tracked repositories yet",
    description: "Search for a repository above and track it to see its stats here.",
  },
};

export const WithIconAndAction: Story = {
  args: {
    icon: <RadarRoundedIcon color="primary" sx={{ fontSize: 40 }} />,
    title: "Nothing here yet",
    description: "Track a repository to start monitoring its stats.",
    actionLabel: "Browse trending repos",
    onAction: fn(),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "No results",
  },
};
