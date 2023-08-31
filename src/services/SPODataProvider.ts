import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/fields";

export default class SPODataProvider {
  constructor(siteUrl: string) {
    sp.setup({
      sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl: siteUrl,
      },
    });
  }

  public async GetElement() {
    try {
      const items = await sp.web.lists
        .getByTitle("pruebadrfi")
        .items.select("Id", "Title", "Aliados")
        .get();
      return items;
    } catch (error) {
      console.log(error);
    }
  }
}
