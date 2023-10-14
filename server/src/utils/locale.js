exports.default = {
  language: "es",
  availableLanguages: ["es"],
  translations: {
    es: {
      labels: {
        ComandesPendents: "Pendents",
        ComandesPreparades: "Preparades",
        ComandesEntregades: "Entregades",
        Usuari: "Usuaris",
        Producte: "Productes",
        Categoria: "Categories",
        navigation: "Navegació",
        pages: "Accions",
      },
      properties: {
        username: "Correu",
      },
      actions: {
        show: "Veure",
        delete: "Eliminar",
      },
      buttons: {
        save: "Desar",
        confirm: "Confirmar",
        cancel: "Cancel·lar",
        addNewItem: "Afegir nou ítem",
        filter: "Filtrar",
        applyChanges: "Aplicar canvis",
        resetFilter: "Reiniciar",
        confirmRemovalMany: "Confirmar l'eliminació d'{{count}} registre",
        confirmRemovalMany_plural:
          "Confirmar l'eliminació de {{count}} registres",
        logout: "Tancar la sessió",
        login: "Accés",
        seeTheDocumentation: "Veure: <1>la documentació</1>",
        createFirstRecord: "Crear primer registre",
      },
      messages: {
        successfullyBulkDeleted: "eliminat amb èxit {{count}} registre",
        successfullyBulkDeleted_plural: "eliminat amb èxit {{count}} registres",
        successfullyDeleted: "Registre eliminat amb èxit",
        successfullyUpdated: "Registre actualitzat amb èxit",
        thereWereValidationErrors:
          "Hi ha errors de validació. Comprovi-los a continuació.",
        forbiddenError:
          "No pot realitzar l'acció {{actionName}} en {{resourceId}}",
        anyForbiddenError: "No pot realitzar l'acció donada",
        successfullyCreated: "S'ha creat amb èxit un nou registre",
        bulkDeleteError:
          "S'ha produït un error en eliminar els registres. Consulteu la consola per obtenir més informació.",
        errorFetchingRecords:
          "S'ha produït un error en obtenir els registres. Consulteu la consola per obtenir més informació.",
        errorFetchingRecord:
          "S'ha produït un error en obtenir el registre. Consulteu la consola per obtenir més informació.",
        noRecordsSelected: "No ha seleccionat cap registre",
        theseRecordsWillBeRemoved: "S'eliminarà el següent registre",
        theseRecordsWillBeRemoved_plural: "S'eliminaran els següents registres",
        pickSomeFirstToRemove: "Per eliminar registres, primer ha de triar-los",
        error404Resource:
          "Recurs d'identificació donada: {{resourceId}} no es va poder trobar",
        error404Action:
          "Recurs d'identificació donada: {{resourceId}} no té una acció amb el nom: {{actionName}} o vostè no està autoritzat a utilitzar-la!",
        error404Record:
          "Recurs d'identificació donada: {{resourceId}} no té registre amb id: {{recordId}} o vostè no està autoritzat a utilitzar-lo!",
        seeConsoleForMore:
          "Consulteu la consola de desenvolupament per obtenir més detalls...",
        noActionComponent:
          "Ha de implementar el component d'acció per a la seva Acció",
        noRecordsInResource: "No hi ha registres en aquest recurs",
        noRecords: "No hi ha registres",
        confirmDelete: "Realment vol eliminar aquest element?",
        welcomeOnBoard_title: "Benvingut!",
        welcomeOnBoard_subtitle: "Ara vostè és un de nosaltres!",
        addingResources_title: "Addició de recursos",
        addingResources_subtitle: "Com afegir nous recursos a la barra lateral",
        customizeResources_title: "Personalitzar recursos",
        customizeResources_subtitle:
          "Definició de comportament, afegir propietats i més...",
        customizeActions_title: "Personalitzar accions",
        customizeActions_subtitle:
          "Modificació d'accions existents i afegir-ne de noves",
        writeOwnComponents_title: "Escriure components",
        writeOwnComponents_subtitle: "Com modificar l'aparença d'AdminJS",
        customDashboard_title: "Tauler personalitzat",
        customDashboard_subtitle:
          "Com modificar aquesta vista i afegir noves pàgines a la barra lateral",
        roleBasedAccess_title: "Control d'accés basat en rols",
        roleBasedAccess_subtitle: "Crear rols d'usuari i permisos a AdminJS",
        community_title: "Uniu-vos a la comunitat d'AdminJS",
        community_subtitle:
          "Parli amb els creadors d'AdminJS i altres usuaris d'AdminJS",
        foundBug_title: "Heu trobat un error?",
        foundBug_subtitle:
          "Plantegeu un problema al nostre repositori de GitHub",
        needMoreSolutions_title: "Necessiteu solucions més avançades?",
        needMoreSolutions_subtitle:
          "Estem aquí per oferir-vos un disseny d'UX/UI bell i programari personalitzat basat en AdminJS (no només)",
        invalidCredentials: "Correu electrònic i/o contrasenya incorrectes",
        keyPlaceholder: "CLAU",
        valuePlaceholder: "VALOR",
        initialKey: "Clau-{{number}}",
        keyInUse: "Les claus d'objecte han de ser úniques.",
        keyValuePropertyDefaultDescription:
          "Tots els valors s'emmagatzemen com a text.",
        pageNotFound_title: "Pàgina no trobada",
        componentNotFound_title: "Cap component especificat",
        componentNotFound_subtitle:
          "Ha de especificar el component que representarà aquest element.",
      },
    },
  },
};
