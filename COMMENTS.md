# Komentáře k vývoji

- API s Endpointem: `GET:/event-tickets?eventId=<uuid>` vrací pouze lístky, které jsou k dispozici. Což vede k tomu, že při zobrazení docházelo k neurovnaným a nepřehledným řadám
- Z toho důvodu jsem po Fetchi daná data upravil a přidal do nich sedačky, které nejsou k dispozici. To je za mě mnohem lépe uživtelsky přívětivé. Ideálně by dávalo smysl, aby tuto informaci vracela už daná API. Možná se vyskytuje elegantní řešení jak to vyřešit bez zásahu do API/dat, ale nepřišel jsem na něj.
- Sedačky jsou barevně odlišeny podle ceny. Barvu jsem se snažil vybrat tak, aby to bylo UX friendly. Nejlepší by mně ale přišlo, aby se VIP vstupenky prodávaly odděleně. Přijde mně, že je to standard při prodeji lístků. Není moc velká šance, že půjdu ve 2 lidech na koncert a každý si koupíme jiný druh lístku :)
- 