"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { config } from "@/config";

export default function Home() {
  const [status, setStatus] = useState<"complete" | "loading">("complete");
  const [tweet, setTweet] = useState<string>("");

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Tweetify. Add your notes, and hit the big button...</p>
      </div>

      <div className={styles.center}>
        <form
          className={styles.form}
          onSubmit={async (ev) => {
            ev.preventDefault();
            try {
              setStatus("loading");
              const form = ev.target as HTMLFormElement;
              const url = form.url.value;
              const context = form.context.value;

              const { tweet } = await fetch(`${config.apiUrl}/tweetify`, {
                method: "POST",
                body: JSON.stringify({
                  urls: url ? [url] : [],
                  textContent: context,
                }),
                headers: { "Content-Type": "application/json" },
              }).then((res) => res.json());

              console.log(tweet);
              setTweet(tweet);
            } finally {
              setStatus("complete");
            }
          }}
        >
          <input
            type="url"
            name="url"
            id="url"
            placeholder="URL (optional)"
            className={styles.url}
          />
          <br />

          <textarea
            className={styles.context}
            name="context"
            id="context"
            placeholder="Your context/opinions"
          />
          <br />

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Loading..."
              : "TURN THE ABOVE INTO A TWEET"}
          </button>
          <br />
          <br />
          <br />
          {tweet && <div className={styles.tweet}>{tweet}</div>}
        </form>
      </div>

      <div className={styles.grid}>
        <p>
          Code:{" "}
          <a
            href="https://github.com/ISNIT0/tweetable-frontend"
            target="_blank"
          >
            <strong>Front-end</strong>
          </a>
          ,{" "}
          <a href="https://github.com/ISNIT0/tweetable-backend" target="_blank">
            <strong>Back-end</strong>
          </a>
        </p>
      </div>
    </main>
  );
}
