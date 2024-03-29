"use client";

import {
  toPlainText,
  PortableText,
  PortableTextReactComponents,
} from "@portabletext/react";
import HeaderSlogan from "@/app/ui/header/header-slogan";
import { formatDate } from "@/app/lib/utils";
import { PortableTextBlock } from "@sanity/types";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import haskell from "highlight.js/lib/languages/haskell";
import cpp from "highlight.js/lib/languages/cpp";

import { useEffect } from "react";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("haskell", haskell);

export default function DisplayPost({ post }: { post: any }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const myComponents: Partial<PortableTextReactComponents> = {
    types: {
      code: ({
        value,
      }: {
        value: { language: string; code: PortableTextBlock[] };
      }) => (
        <div className="not-prose mb-6 rounded border border-mid">
          <p className="bg-mid px-1 py-0.5 text-right text-xs">
            {value.language}
          </p>
          <pre>
            <code className={`text-sm leading-6 ${value.language}`}>
              {toPlainText(value.code)}
            </code>
          </pre>
        </div>
      ),
    },
  };

  return (
    <article>
      <HeaderSlogan slogan={[post.title]} color="white" />
      <div className="prose prose-slate prose-invert m-2 rounded bg-darky p-2 text-justify prose-headings:text-center sm:mx-auto sm:my-4 sm:p-4">
        <PortableText value={post.body} components={myComponents} />
        <p className="text-center">
          <time className="text-xs text-lighty">
            Last edited at {formatDate(new Date(post.publishedAt))}
          </time>
        </p>
      </div>
    </article>
  );
}
