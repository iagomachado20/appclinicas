import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { UtilProvider } from '../../providers/util';
import { MedicosPage } from '../medicos/medicos';
import { LocalizacaoProvider } from '../../providers/localizacao/localizacao';

@Component({
  selector: 'page-consultas',
  templateUrl: 'consultas.html'
})
export class ConsultasPage {
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public crudProvider: CrudProvider,
    public util: UtilProvider,
    public auth: LocalizacaoProvider
  ) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = [];

    this.loadingData();

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MedicosPage, {
      id: item['Id'],
      especialidade: item['Nome']
    });
  }

  loadingData() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
  
    loading.present();

    const entityId = this.auth.getUnity;

    this.crudProvider.getData('/especialidades/todas?entidadeId='+ entityId)
    .subscribe(res => {
      
      this.items = res['Data'];

      setTimeout(() => {
        loading.dismiss();
      }, 1000);

    },
    error => {

      this.util.sendToast('Ocorreu um erro ao solicitar seu dados!');

      setTimeout(() => {
        loading.dismiss();
      }, 1000);

    });
    
  }

  doRefresh(event) {

    this.loadingData();

    setTimeout(() => {
      event.complete();
    }, 2000);
  }

}
