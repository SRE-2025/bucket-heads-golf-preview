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
3. Add event-specific line-item properties to the player and team product forms: captain name, phone, email, team name, and all six player names. Add company name, sponsor contact, and logo follow-up instructions to the sponsor product.
4. Include a hidden event value of `Onion Creek Club Scramble` with every registration so a future tournament cannot be mixed into the same reporting bucket.
5. Keep all payments in Shopify checkout. Do not introduce a second payment or order database.
6. Before launch, place one clearly labeled test for each path, confirm the product ID, price, line-item properties, checkout handoff, order record, email notification, and analytics event, then cancel or refund the test orders according to the client's normal process.
7. Verify the Tournament links in desktop navigation, mobile navigation, homepage strip, and footer.
8. Add the confirmed date and tee time only after Bucket Heads publishes or supplies them.

The GitHub preview intentionally sends registration clicks to the three current live Shopify products. It does not create a second form or database.
