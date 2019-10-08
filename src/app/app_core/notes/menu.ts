export const ModulesList = [{
    label: 'Accueil',
    icon: 'home',
  id: "show_home",
  children: [{
    label: 'Général',
    icon: 'home',
    action: 'home'
}]
  },{
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
  label: 'Visuel',
  icon: 'create',
  id: "add_creative",
  children: [{
      label: 'Ajouter un visuels',
    icon: 'create',
     action: 'createCreatives'
  }]
  },
  {
  label: 'Liste des visuels',
  icon: 'view_list',
  id: "view_list_ad",
  children: [{
      label: 'Liste des visuels',
    icon: 'view_list',
     action: 'listCreatives'
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
    label: 'RÃ©capitulatifs des paiments',
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

