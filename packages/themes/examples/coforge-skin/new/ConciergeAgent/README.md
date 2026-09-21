# ConciergeAgent

Chat + tools that mutate booking state. HeaderPanel is the chrome; tools live in
`app-book/tools.js`.

**Why new:** HeaderPanel/Switcher is a jump list, not an agent.

**Wraps:** HeaderGlobalAction, HeaderPanel, TextInput, Button, Tag,
InlineNotification  
**Forbidden:** `confirm_pay`, `cf-*`, hiding search tabs
