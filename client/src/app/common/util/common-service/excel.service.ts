import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
@Injectable()
export class ExcelExportService {
    constructor() {}

    static toExportFileName(excelFileName: string): string {
      return `${excelFileName}_${new Date().getDate()}.xlsx`;
    }
  
    public exportAsExcelFile(json: any[], excelFileName: string): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      XLSX.writeFile(workbook, ExcelExportService.toExportFileName(excelFileName));
    }
}