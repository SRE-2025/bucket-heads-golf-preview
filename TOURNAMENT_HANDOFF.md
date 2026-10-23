# Tournament registration continuity

The redesign must use the active Onion Creek Club products as the single source of truth. The published `golf-tournament-sign-up` page still contains the past Plum Creek event and must not be copied into the replacement theme.

## Verified active event inventory

- Event: Onion Creek Club Scramble
- Format: six-player scramble
- No current date or tee time is published in the active Shopify products, so the preview intentionally does not invent one.
- Single player: product `9572420452583`, variant `52158742954215`, handle `scramble-registration`, $175
- Team of six: product `9572652482791`, variant `52158875074791`, handle `scramble-registration-4-player-team`, $1,050
- Hole sponsor: product `9680298475751`, variant `52511999492327`, handle `scramble-hole-sponsor`, $400

## Launch rules

1. Do not recreate or duplicate the three active products. Keep their product and variant IDs so orders, inventory, and analytics stay connected.
2. Replace the stale Plum Creek content at `golf-tournament-sign-up` or redirect that path to the new tournament page so saved links cannot lead to the past event.
3. Keep the captain-led team builder shown in the preview. It generates a memorable captain-based code such as `TIM-4827` and places that code, captain name, player identity, role, event, and payment plan into Shopify line-item properties. A separate team name is intentionally not collected.
4. For split payment, the captain buys one single-player variant (`52158742954215`) and shares the generated link. Each teammate's link reuses the same team code and adds another single-player variant to that player's own Shopify cart.
5. For full-team payment, the captain buys the existing six-player variant (`52158875074791`) and the entered roster names travel with the order. The invite link tells teammates that the captain covered the team.
6. Add company name, sponsor contact, and logo follow-up instructions to the sponsor product.
7. Include a hidden event value of `Onion Creek Club Scramble` with every registration so a future tournament cannot be mixed into the same reporting bucket.
8. Keep all payments in Shopify checkout. Do not introduce a second payment or order database.
9. Before launch, place one clearly labeled test for each path, confirm the product ID, price, line-item properties, checkout handoff, order record, email notification, and analytics event, then cancel or refund the test orders according to the client's normal process.
10. Add server-side enforcement for the six-player maximum before going live. The preview correctly groups orders by team code, but a static page cannot prevent a seventh person from using an old shared link after the team fills.
11. Verify the Tournament links in desktop navigation, mobile navigation, homepage strip, and footer.
12. Add the confirmed date and tee time only after Bucket Heads publishes or supplies them.

## Sponsorship flow

- The redesign includes `tournament-sponsor.html` with two paths: purchase the current $400 hole sponsorship or submit a custom-package inquiry.
- The purchase form uses the existing hole sponsor variant `52511999492327` and attaches the event, company, sponsor contact, email, phone, website/social, notes, and logo follow-up requirement as Shopify line-item properties.
- The inquiry form posts through Bucket Heads' existing Shopify contact route and labels the message `tournament-sponsorship-inquiry`; it must continue to notify `admin@bucketheadsgolf.com` after launch.
- Do not promise specific signage, social posts, attendee counts, or other deliverables until Bucket Heads confirms them for the event.

The GitHub preview intentionally sends payment to the existing live Shopify variants. It does not create a second payment system or order database.
