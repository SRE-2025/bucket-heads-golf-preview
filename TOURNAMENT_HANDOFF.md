# Tournament registration continuity

The redesign must keep the current Shopify registration system as the single source of truth.

- Public path: `https://bucketheadsgolf.com/pages/golf-tournament-sign-up`
- Shopify Forms instance: `92cb7b1d-488a-4728-9b20-1d4129e2bcec`
- Current event: Plum Creek Golf Course, Thursday, October 22, 2026 at 1:30 PM
- Current fields: first name, last name, phone, optional SMS consent, email, optional email consent, team name, and teammates
- Post-submit purchase choices: $125 individual entry or $500 team entry

## Launch rules

1. Do not replace the Shopify form with a separate static form or a new form instance.
2. Keep the existing page handle `golf-tournament-sign-up` so saved links and campaign traffic continue working.
3. Keep the Shopify Forms app embed enabled in the replacement theme.
4. Preserve the form's post-submit redirect to the existing individual and team entry products.
5. Before launch, submit one clearly labeled internal test registration, confirm it appears in the existing Shopify Forms submissions list, confirm the redirect, and then remove the test record.
6. Verify the Tournament links in desktop navigation, mobile navigation, and the footer.

The GitHub preview intentionally sends registration clicks to the live Shopify form so preview testing cannot create a second signup database.
