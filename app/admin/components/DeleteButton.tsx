"use client";

interface Props {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}

export default function DeleteButton({ action, confirmMessage, label = "削除" }: Props) {
  return (
    <form
      action={async () => {
        if (!confirm(confirmMessage)) return;
        await action();
      }}
    >
      <button
        type="submit"
        className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-500 transition hover:bg-rose-100"
      >
        {label}
      </button>
    </form>
  );
}
