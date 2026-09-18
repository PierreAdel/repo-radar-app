import type { Meta, StoryObj } from "@storybook/react";
import { StarsBarChart } from "./StarsBarChart";

const meta: Meta<typeof StarsBarChart> = {
  title: "Repo Radar/StarsBarChart",
  component: StarsBarChart,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof StarsBarChart>;

export const Default: Story = {
  args: {
    data: [
      { label: "react", value: 231000 },
      { label: "vue", value: 208000 },
      { label: "svelte", value: 79000 },
      { label: "solid", value: 32000 },
    ],
  },
};

export const SingleRepo: Story = {
  args: {
    data: [{ label: "react", value: 231000 }],
  },
};

export const ManyRepos: Story = {
  name: "Many tracked repos",
  args: {
    data: Array.from({ length: 12 }, (_, i) => ({
      label: `repo-${i + 1}`,
      value: Math.round(1000 * Math.pow(1.6, 12 - i)),
    })),
  },
};

export const TallBar: Story = {
  name: "Custom height",
  args: {
    data: [
      { label: "react", value: 231000 },
      { label: "vue", value: 208000 },
    ],
    height: 400,
  },
};
