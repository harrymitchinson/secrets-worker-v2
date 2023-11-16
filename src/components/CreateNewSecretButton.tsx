export interface Props {
  onClick: () => void;
}

export default function CreateAnotherSecret({ onClick }: Props) {
  return (
    <div className="w-full max-w-screen-md max-w-s p-0 sm:pt-8">
      <button
        type="button"
        disabled={false}
        onClick={onClick}
        title="Create a new secret"
        className={`sm:shadow-md transition w-full bg-indigo-600 dark:bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-700 text-gray-100 dark:text-gray-100 sm:rounded font-bold py-4 px-4 focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2 disabled:bg-gray-300  dark:disabled:bg-gray-700 disabled:text-gray-400`}
        tabIndex={0}
      >
        Create a new secret
      </button>
    </div>
  );
}
