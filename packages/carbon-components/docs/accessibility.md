# Automated Verification Testing (AVT) stage 1

AVT1 testing is done with a browser extension developed by IBM called the
Dynamic Assessment Plugin (DAP). It's a great first step to locking down and
ensuring inclusivity and accessibility in your websites and components.

## Installing DAP🔧

1. Grab the plugin while connected to IBM's W3
   [from here](https://ibm.biz/BdYkWF).

   _Be Warned: Make sure you only download the latest plugin from the specific
   link above which should be version >1.7. The IBM DAP plugin available to the
   public in the Chrome extension marketplace is unmaintained and will not
   support the latest rulesets._

2. At the top left of [this page](https://ibm.biz/BdYkML) is a button that will
   copy to your clipboard the Authentication Token you'll need to access IBM's
   rulesets. Click it.
3. With the plugin installed and your token copied head into DAP's options found
   inside the plugin dropdown menu and paste the token into the Authentication
   form and hit apply.
4. Now that DAP's authenticated the Supported Rulesets section in the options
   menu of the plugin should be populated. Typically you're going to want the
   latest ruleset unless someone has told you otherwise.
5. Hit the apply button at the bottom of the page.

## Using DAP👷

Let's DAP! It's pretty straight forward, but there are a few gotchas. For
consistency's sake we'll use DAP on the
[Dynamic Assessment Plug-in Homepage](https://ibm.biz/BdYkM9).

Head over to the page and hit `cmd-option-c` to open up your dev tools. DAP is
tucked away inside a drop down menu inside a panel. From the default Elements
panel hit the >> icon below the X on the far right. You should see `DAP`. Click
that to fire up DAP for this page.

_Be Warned: You can only run DAP with internal IBM rulesets if you're connected
to W3. On an IBM campus this isn't a problem, but if you're abroad fire up the
Cisco AnyConnect Secure Mobility Client._

Hit the play button and wait for the scan to finish. **We've got violations!**.
At the time of writing there are 7 Violations, 9 Potential Violations, and 2
Manual Checks. There's also multiple "frames", but if you're testing single
components or a group of components in a Storybook environment you can ignore
those✋.

On the main frame (the one open by default) there's a detailed list of all
violation types. Clicking into each violation type gives you more nested
dropdowns -- one for each violation found on the page of that specific type.
Each violation's dropdown gives you two further options:

1.  A description of the general violation with a ? icon that when clicked will
    take you to further documentation detailing the violation and most helpfully
    how to fix it.
2.  A description of this particular instance of a violation (say for instance
    an image with no alt attribute). And a crossed out eyeball you can click to
    ignore this violation which is helpful when printing reports for posterity's
    sake.

## Running an AVT1 Audit📋

Whenever any new UI code is introduced or existing code is changed or updated we
should run DAP on the new code so we can make sure it meets or exceeds IBM's
accessibility standards.

DAP is always evolving its rulesets but unfortunately it can report false
positives when testing exclusively on a component. Typically we're not auditing
a webpage or a website as a whole, but a single component in isolation -- sadly
this was not DAP's intended purpose and so it throws a lot of false positive
violations that you'll first need to sift through and ignore if we're going to
be keeping and recording this audit. If you're just testing while you develop or
before you push a PR, feel free to just disregard them.

If the component fails or has a violation an issue should be made so that
someone can fix the problem. Feel free to include in the issue any relevant
information you think would helpful, but make sure to at least include these
points:

1. The environment where the failure happened. The browser make and version as
   well as the ruleset and operating system.
2. A description of the failure (copy an pasted from DAP's logs is fine).
3. A screenshot of the particular offending code.
4. Steps to reproduce the violation for anyone who may want to tackle the issue
   but may not have read this guide.

If running DAP produces no violations (that's awesome🎉) we still want to record
and keep proof that DAP was run so we can make sure we're staying on top of
accessibility testing for each component as they change and get updated per each
release. To do that:

1. Click the hamburger menu in the top right of the DAP panel and select
   Download Report.
2. In the modal select JSON and five your report a helpful name in this format
   `componentname_subtype.html` and then download.

   _Be warned: Occasionally clicking the Download Report button won't work. This
   can be a serious pain if the dev has already gone through and ignored false
   positives. I've had a 100% success rate with Download Report if after I open
   the DAP panel in my dev tools I then reload the page with the panel open. 😞
   -- D.A._

3. [Follow this link](https://ibm.biz/BdYkMA) and select the folder that
   corresponds with the ruleset the component was tested against and drop the
   JSON file in there.

# Automated Verification Testing stage 2

["Keyboard accessibility is one of the most important aspects of web accessibility."](https://webaim.org/techniques/keyboard/)
and it's the focus of part 1 of our AVT2 testing!

Here's what we're looking for during our AVT2 audit. There are two main parts:

## Keyboard accessibility testing⌨️

1. All functionality should be available from a keyboard without exception.
2. Keyboard navigation uses standardized keystrokes:

   - TAB to move forward through the various focusable elements.
   - SHIFT+TAB to move backward through previous focusable elements.
   - ENTER or SPACE to activate, select, or otherwise interact with focusable
     elements.
   - Escape to close popups, toasts, or modals and return focus to main page
     content.

     _Any variance on these standardized keystrokes should be outlined clearly
     to the user beforehand_

3. If an element can receive keyboard focus it should reflect that in it's
   styling with a focused state.
4. If you can move focus to an element with the keyboard you should be able to
   move focus away from that element with a keyboard.
5. Navigating through the pages tabbable elements makes sense in terms of their
   order.
6. Long or burdensome lists, links, or navigation should provide a "skip to main
   content" link.

### How to test

Essentially open the component or web page you're auditing. Then make a note of
all the elements on the page that are interactable with a mouse in any way.
Finally moving through the list above attempt to interact with those elements
using only your keyboard in the manner described. Integrating this test
throughout each stage of development will save you the pain of retro-fitting a
component with the necessary keyboard functionality.

## Screen Magnifier testing🔎

(Credit to Frederick Creemers
[excellent article](https://dev.to/_bigblind/how-to-make-your-website-accessible-to-people-who-use-a-screen-magnifier)
talking about his experience as a visually impaired screen magnification user on
the web.)

A user with a screen magnifier views web content on a component by component
basis through a 2x, 4x, or 8x (etc) zoomed in box. Two things become very
important when using a screen magnifier -- context and component permanence. We
can dig into those points further:

1. Tooltips, toasts and popups should be shown to the user adjacent to where
   they were triggered.

   It is a common pattern on the web to have the user perform a task and have
   that task's confirmation displayed elsewhere in the user interface (like a
   toast assuring the user their work was saved, or a small number in the top
   corner indicating something's in your shopping cart). This can leave screen
   magnifier users wondering if their actions had any result at all. Instead
   keep confirmation, dialogues, tooltips and toasts adjacent to the actions
   that triggered them.

2. Tooltips or any word bubble type notifications or information areas should
   not depend on a mouse hover.

   Depending on hover as a mouse action to trigger a dialogue or tooltip isn't
   accessible. Commonly a screen magnifier shows a zoomed in view of the page
   relative to the cursor position. This means that unless then tooltip or
   dialogue is quite small the user can't trigger the component _and_ scroll
   it's content into view.

3. Don't obscure content on mouse hover

   Obscuring all or some of the page on mouse hover with an overlay or blur is a
   problem for user of screen magnifiers. Maintain required contrast ration and
   instead signal to your users with some other visual distinction.

### How to test

Keyboard accessibility is generally more familiar to developers than
magnification tools, but take this opportunity to familiarize yourself with
macOS Zoom Windows Magnifier, or your OS's native low vision accessibility tools
as they are relied on by millions of people with temporary or permanent vision
impairment every day.

Simply _use_ each component in the manner it was intended while zoomed in to 2x,
4x, and finally 8x magnification while taking into consideration the points
mentioned above. Along with the three points mentioned above keep in mind more
broad accessibility rules that are in question given this new context.

For example: a hover animation indicating an element has received focus might be
great and well within expected parameters, but zoomed into 4x magnification it
may be difficult for a user to see.
