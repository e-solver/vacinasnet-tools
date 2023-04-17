// sample data
const sheet = "sample_data/PlanilhaDeHomologacao.xlsx";

const {
  vtexHomologation,
  jennerHomologation,
} = require("../clinicHomologation/");

const createClinicFromSheetJSON = require("../../clinic/interfaces/controllers/createClinicFromSheetJSON");

const { createJSONFromSheet } = require("../../infra/xlsx/sheet");

const homologateClinicFromSpreadsheet = async (file, sheetName) => {
  const json = createJSONFromSheet(file, sheetName);

  for (const item of json) {
    const clinic = createClinicFromSheetJSON(item);
    const vtexResults = await vtexHomologation(clinic);
    const {
      warehouse: { id: warehouseId },
      shippingPolicy: { shippingMethod: slasIds },
    } = vtexResults;

    const jennerResults = await jennerHomologation(clinic, {
      warehouseId,
      slasIds: [slasIds],
    });
    console.log({
      ...vtexResults,
      ...jennerResults,
    });
  }
};

(async () =>
  console.log(await homologateClinicFromSpreadsheet(sheet, "Sheet1")))();
