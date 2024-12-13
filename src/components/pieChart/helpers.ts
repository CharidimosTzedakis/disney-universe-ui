import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { unparse } from "papaparse";
import type { FilmsPieChartDataPoint } from "@stores/chartStore";

export const exportToExcel = async (
  data: FilmsPieChartDataPoint[],
  fileName: string = "characters_films",
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("sheet1");

  if (data.length > 0) {
    worksheet.columns = Object.keys(data[0]).map((key) => {
      const name = key === "y" ? "Number of films" : key;
      return { header: name, key };
    });
  }

  data.forEach((row) => {
    worksheet.addRow({
      ...row,
      films: unparse([row.films.filter((film) => Boolean(film))]),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};
