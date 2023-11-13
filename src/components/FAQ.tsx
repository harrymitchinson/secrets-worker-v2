"use client";

import { useRouter } from "next/navigation";
import CreateAnotherSecret from "./CreateAnotherSecretButton";
import Panel from "./Panel";

export default function FrequentlyAskedQuestions() {
  const router = useRouter();
  return (
    <>
      <Panel title="FAQs">
        <h2 className="font-bold mb-4 text-xl">Frequently asked questions</h2>
        <div className="w-full">
          <details className="w-full mb-2" open={true}>
            <summary className="font-semibold px-4 text-lg cursor-pointer">
              What is this for?
            </summary>
            <div className="mt-4">
              <p className="mb-4">
                This tool provides a quick, effective and secure way to share
                one-time secrets.
              </p>
            </div>
          </details>
          <details className="w-full mb-2">
            <summary className="font-semibold px-4 text-lg cursor-pointer">
              How does it work?
            </summary>
            <div className="mt-4">
              <h3 className="font-bold mb-4">Creating a secret</h3>
              <p className="mb-4">
                Secrets are sent to the API where they are encrypted against a
                randomly generated password. The API stores the encrypted secret
                content in Cloudflare KV storage with the requested time-to-live
                (TTL) set so that the encrypted data will be automatically
                deleted when the TTL expires, in the event of the secret not
                being read before then. The password is not stored in KV and is
                only returned to the client along with a unique ID for the
                encrypted secret content to provide the sharing link.
              </p>
              <h3 className="font-bold mb-4">Viewing a secret</h3>
              <p className="mb-4">
                The encrypted secret content is decrypted using the provided
                password, assuming this process was successful (i.e. the
                password was correct) then encrypted secret content is removed
                from Cloudflare KV storage to ensure one-time readability, then
                the decrypted secret content is returned to the client for
                viewing.
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="font-semibold px-4 text-lg cursor-pointer">
              Is it safe?
            </summary>
            <div className="mt-4">
              <p className="mb-4">
                Secret content is encrypted using AES-GCM encryption against a
                randomly generated password (PBKDF2) derived key. Only the
                encrypted secret content is persisted and only for as long as
                one of the following happens, which ever happens first.
              </p>
              <ul className="list-outside ml-8 list-disc mb-4">
                <li className="mb-2">The secret was read</li>
                <li className="mb-2">The TTL of the secret expires</li>
              </ul>
              <p className="mb-4">
                The generated password is never persisted and is only returned
                to the client for use in generating the one-time sharing link.
                Once this link is no longer visible (navigated away, refreshed
                etc.), there is no way to recover the password. If a password is
                lost, the secret will simply never be decrypted then will
                eventually expire and be deleted once the TTL is reached.
              </p>
              <p className="mb-4">
                As part of the process to view a secret using the correct
                password, the encrypted secret data is deleted so that it can
                never be decrypted again. However, due to limitations in
                Cloudflare KV storage consistency, it could be technically
                possible to read a secret again for a short window of time.
              </p>
              <ul className="list-outside ml-8 list-disc mb-4">
                <li className="mb-2">
                  Changes are usually immediately visible in the Cloudflare
                  global network location at which they are made, so multiple
                  users in the same Cloudflare network location would be unable
                  to read the same secret.
                </li>
                <li className="mb-2">
                  Changes may take up to 60 seconds or more to be visible in
                  other global network locations as their cached versions of the
                  data time out, so in this case it could be technically
                  possible to read a secret multiple times as the change to
                  delete the secret once decrypted has not yet replicated across
                  the Cloudflare network.
                </li>
              </ul>
              <p className="mb-0">
                All source code is visible on{" "}
                <a
                  title="GitHub"
                  className="transition text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 font-bold rounded focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/harrymitchinson/secrets-worker-v2"
                >
                  GitHub
                </a>{" "}
                but most importantly, you should use your own judgement.
              </p>
            </div>
          </details>
        </div>
      </Panel>
      <CreateAnotherSecret onClick={async () => await router.push("/")} />
    </>
  );
}
