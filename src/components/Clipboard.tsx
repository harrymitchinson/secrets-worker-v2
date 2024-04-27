import toast from "react-hot-toast";
import Toast, { State } from "./Toast";

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      return document.execCommand("copy", true, text);
    }
  } catch (err) {
    return false;
  }
}

export const copyToClipboard = (name: string, value: string) => async () => {
  const copied = await copyTextToClipboard(value);
  if (!copied) {
    toast.custom(
      ({ id, visible }) => (
        <Toast id={id} visible={visible} state={State.Error}>
          Failed to copy {name} to clipboard
        </Toast>
      ),
      {
        id: value,
        position: "bottom-center",
        duration: 4000,
      }
    );
  }

  toast.custom(
    ({ id, visible }) => (
      <Toast id={id} visible={visible}>
        Copied {name} to clipboard
      </Toast>
    ),
    { id: value, position: "bottom-center", duration: 2000 }
  );
};
