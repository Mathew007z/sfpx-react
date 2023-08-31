import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/fields";

export interface DocumentItem {
  Id: number;
  FileLeafRef: string;
  Aliados: string;
}

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

  public async GetElement(): Promise<DocumentItem[]> {
    try {
      const libraryName = "pruebaDocumentos";
      const items = await sp.web.lists.getByTitle(libraryName).items.select("Id", "FileLeafRef", "Aliados").getAll();
      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}





// Get a lista de sp

// import { sp } from "@pnp/sp/presets/all";
// import "@pnp/sp/fields";

// export default class SPODataProvider {
//   constructor(siteUrl: string) {
//     sp.setup({
//       sp: {
//         headers: {
//           Accept: "application/json;odata=verbose",
//         },
//         baseUrl: siteUrl,
//       },
//     });
//   }

//   public async GetElement() {
//     try {
//       const items = await sp.web.lists
//         .getByTitle("pruebadrfi")
//         .items.select("Id", "Title", "Aliados")
//         .get();
//       return items;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
