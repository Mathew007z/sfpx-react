import * as React from 'react';
import { ISpfxFilterReactProps } from './ISpfxFilterReactProps';
import SPODataProvider from '../../../services/SPODataProvider';
import { TextField } from 'office-ui-fabric-react';

export default class SpfxFilterReact extends React.Component<ISpfxFilterReactProps, { selectedAliado: string; documents: any[] }> {
  private dataProvider: SPODataProvider;

  constructor(props: ISpfxFilterReactProps) {
    super(props);
    this.dataProvider = new SPODataProvider("https://cafcon.sharepoint.com/sites/PeopleSearch");
    this.state = {
      selectedAliado: "",
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

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ selectedAliado: event.target.value });
  };

  render() {
    const { documents, selectedAliado } = this.state;

    // Filtrar documentos basados en el aliado seleccionado
    const filteredDocuments = documents.filter(doc =>
      doc.Aliados.toLowerCase().includes(selectedAliado.toLowerCase())
    );

    return (
      <div>
        <TextField
          placeholder='Buscar Documento por Aliado'
          onChange={this.handleSearchChange}
          value={selectedAliado}
        />
        {filteredDocuments.map((doc) => (
          <div key={doc.Id} style={{padding:'40px', border:'1px solid #000'}}>
            <h3>{doc.Title}</h3>
          </div>
        ))}
      </div>
    );
  }
}
