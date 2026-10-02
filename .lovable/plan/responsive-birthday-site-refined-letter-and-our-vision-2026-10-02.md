# Responsive birthday site, refined letter, and Our Vision

## What will change
- Preserve the welcome, birthday cake, story, photo memories, letter, reasons, gift, and final birthday sections with their existing interactions.
- Rework responsive sizing and spacing for 320–430px phones, 768–1024px tablets, and larger desktop screens so content stays within the viewport.
- Refine the story timeline into a clear single column on phones and keep the balanced alternating layout on larger screens.
- Make the photo gallery one column at the narrowest width, two columns on standard phones/tablets, and three columns on desktop; keep the full-screen photo viewer usable on small screens.
- Replace the current letter presentation with a restrained cream paper design, an introductory message, and an “Open My Letter” envelope interaction that reveals the supplied copy.
- Add an “Our Vision ❤️” section after the letter, showing all ten question-and-answer memories as non-interactive cards and ending with the supplied closing message.
- Add reduced-motion behavior and constrain decorative effects so animations cannot create sideways scrolling.

## Content setup
- Keep the editable sender name in the central love configuration and use it where `[YOUR NAME]` appears.
- Store the Our Vision entries alongside the existing editable story, photos, letter, and reasons content.

## Validation
- Check the preview at 320, 375, 390, 430, 768, 820, 1024, 1280, and 1440px widths.
- Verify there is no horizontal overflow and that the envelope, letter, gallery viewer, cake, reasons, gift, and reveal animations remain usable.
- Confirm the latest site build completes without errors.
