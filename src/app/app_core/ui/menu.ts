export const ModulesList = [{
    label: 'Liste des campagnes',
    icon: 'list',
  id: "show_campaign",
  children: [{
    label: 'Liste de mes campagnes',
    icon: 'view_array',
    action: 'toggleCampaignList'
}]
  },{
  label: 'Campagne',
  icon: 'add',
  id: "add_campaign",
  children: [{
      label: 'Lancer un nouvelle campagne',
    icon: 'launch',
     action: 'createCampaign'
  }]
}, 
{
    label: 'Solde du compte',
    icon: 'account_balance',
  id: "account_value",
  children: [{
    label: 'Solde de mon compte',
    icon: 'account_balance_wallet',
     action: 'showAccountValue()'
}]
  },
{
    label: 'Mes paiements',
    icon: 'payment',
  id: "my_paiments",
  children: [{
    label: 'Récapitulatifs des paiments',
    icon: 'receipt',
     action: 'showPaiments()'
}]
},{
    label: 'Informations du compte',
    icon: 'account_box',
  id: "account_infos",
  children: [{
    label: 'Mes données',
    icon: 'account_circle',
     action: 'showUserData'
}]
}];

