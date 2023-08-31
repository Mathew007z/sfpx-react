import * as React from 'react';
import { ISpfxFilterReactProps } from './ISpfxFilterReactProps';
import SPODataProvider from '../../../services/SPODataProvider'; // Asegúrate de que la ruta sea correcta
import { TextField } from 'office-ui-fabric-react';
export default class SpfxFilterReact extends React.Component<ISpfxFilterReactProps, { searchText: string; selectedAliados: string; documents: any[] }> {
  private dataProvider: SPODataProvider; // Instancia de tu proveedor de datos

  constructor(props: ISpfxFilterReactProps) {
    super(props);
    this.dataProvider = new SPODataProvider("https://cafcon.sharepoint.com/sites/PeopleSearch");
    this.state = {
      searchText: "",
      selectedAliados: "",
      documents: []
    };
  }

  async componentDidMount() {
    try {
      const items = await this.dataProvider.GetElement();
      this.setState({ documents: items });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { documents } = this.state;

    return (
      <div>
        <TextField placeholder='Buscar Documento Por Aliado'/>
        {documents.map((doc) => (
          <div key={doc.Id}>
            <h3>{doc.Title}</h3>
          </div>
        ))}
      </div>
    );
  }
}
