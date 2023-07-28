# Unbound ML: Chatbot Test

[https://unboundml-chatbot-test.netlify.app/](https://unboundml-chatbot-test.netlify.app/)

## ChangeLog

### Adds authentication

I opted for `auth0`. Wanted a fully managed solution that would provide users the ability to login with any existing email or social account.

I haven't used Auth0's User Management Admin, but it appears to have all the features you'd expect, including grouping by Organization, setting Roles, and visibility into their auth actions.

### Persistence

Here I opted for `Firestore`, because that's the cloud NoSQL solution I'm most familiar with. I wanted cloud NoSQL because it would be the easiest to manage directly from the client-side. And NoSQL would make it easy to key everything off the user-id. As well, the data organization would be 1:1 with the existing LocalStorage document format.

### Hosting

And here I went with Netlify because Vercel has a super aggressive spam-protection on their login page, apparently, and I was blocked on my first attempt to sign up.

Other options, since I'm already using Firestore would be to host on GCP, but their support for NextJS didn't look as turn-key as Netlify's.

### Welcome Page

For non-logged in users.

### User/session Management

This top-bar on the application gave me an opportunity to add the required "User"/session interface.

### Global Search

Additionally, I found the "Dual Search" functionality to be annoying at best. Instead, a "Global Search" was added that is wired to filter both Conversations and Prompts simultaneously.

### Branding

Then, of course: Hard, Better, Faster, Stronger BRANDING!

### Managing Conversations / Prompts

I also found it awkward to go to the (possibly hidden) sidebars to click either "New Chat" or "New Prompt". Since the whole experience is about this interaction with AI, I did a few things to allow user's to stay focused on the main window:

###### New Chat

Add a "New Chat" button right of the main Input. This way, if your conversation is starting to veer away from its original topic, or you want to delineate prior content from GPT's input, then, even if you have already started typing, you can click "+ Chat" and it will bounce you into a new Conversation.

###### New Prompt

Similarly, the "New Prompt" button was such a confusing drag. You click it, it creates a Prompt...then what? You have to click that, then figure out what to do with the Modal. THEN WHAT? Then you have to remember the secret "/" way to pull the prompt into a conversation. Or open the Modal and copy the prompt manually. Blech. So, now you there is a "-->" button next to every content-entry. If you click that, it will save that as a prompt and automatically open the Modal, in case you'd like to apply a more unique Name to it.

# Chatbot UI

Chatbot UI is an open source chat UI for AI models.

See a [demo](https://twitter.com/mckaywrigley/status/1640380021423603713?s=46&t=AowqkodyK6B4JccSOxSPew).

![Chatbot UI](./public/screenshots/screenshot-0402023.jpg)

## Updates

Chatbot UI will be updated over time.

Expect frequent improvements.

**Next up:**

- [ ] Sharing
- [ ] "Bots"

## Deploy

**Vercel**

Host your own live version of Chatbot UI with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmckaywrigley%2Fchatbot-ui)

**Docker**

Build locally:

```shell
docker build -t chatgpt-ui .
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 chatgpt-ui
```

Pull from ghcr:

```
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 ghcr.io/mckaywrigley/chatbot-ui:main
```

## Running Locally

**1. Clone Repo**

```bash
git clone https://github.com/mckaywrigley/chatbot-ui.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide OpenAI API Key**

Create a .env.local file in the root of the repo with your OpenAI API Key:

```bash
OPENAI_API_KEY=YOUR_KEY
```

> You can set `OPENAI_API_HOST` where access to the official OpenAI host is restricted or unavailable, allowing users to configure an alternative host for their specific needs.

> Additionally, if you have multiple OpenAI Organizations, you can set `OPENAI_ORGANIZATION` to specify one.

**4. Run App**

```bash
npm run dev
```

**5. Use It**

You should be able to start chatting.

## Configuration

When deploying the application, the following environment variables can be set:

| Environment Variable              | Default value                  | Description                                                                                                                               |
| --------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| OPENAI_API_KEY                    |                                | The default API key used for authentication with OpenAI                                                                                   |
| OPENAI_API_HOST                   | `https://api.openai.com`       | The base url, for Azure use `https://<endpoint>.openai.azure.com`                                                                         |
| OPENAI_API_TYPE                   | `openai`                       | The API type, options are `openai` or `azure`                                                                                             |
| OPENAI_API_VERSION                | `2023-03-15-preview`           | Only applicable for Azure OpenAI                                                                                                          |
| AZURE_DEPLOYMENT_ID               |                                | Needed when Azure OpenAI, Ref [Azure OpenAI API](https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/reference#completions) |
| OPENAI_ORGANIZATION               |                                | Your OpenAI organization ID                                                                                                               |
| DEFAULT_MODEL                     | `gpt-3.5-turbo`                | The default model to use on new conversations, for Azure use `gpt-35-turbo`                                                               |
| NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT | [see here](utils/app/const.ts) | The default system prompt to use on new conversations                                                                                     |
| NEXT_PUBLIC_DEFAULT_TEMPERATURE   | 1                              | The default temperature to use on new conversations                                                                                       |
| GOOGLE_API_KEY                    |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |
| GOOGLE_CSE_ID                     |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |

If you do not provide an OpenAI API key with `OPENAI_API_KEY`, users will have to provide their own key.

If you don't have an OpenAI API key, you can get one [here](https://platform.openai.com/account/api-keys).

## Contact

If you have any questions, feel free to reach out to Mckay on [Twitter](https://twitter.com/mckaywrigley).

[GCSE]: https://developers.google.com/custom-search/v1/overview
