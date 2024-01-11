import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { convertString2Date, formatNumber, getCurrentDateTime } from './date'

export const exportExcel = (data: any, headers: string[], name: string) => {
  const result = []
  result.push({
    Customer: '',
    Channel: data.channel,
    Message: data.messages
      .map((message: string, index: number) => {
        if (index % 2 === 0) {
          return 'You - ' + message
        } else {
          return data.agentName + ' - ' + message
        }
      })
      .join('\n'),
    Datetime: convertString2Date(data.start_time),
    Agent: data.agentName,
    'Credits Used': '',
    'Interaction Time': formatNumber(data.interaction_time),
    'Date Exported': getCurrentDateTime(),
  })

  const ws = XLSX.utils.json_to_sheet(result)
  for (let i = 0; i < headers.length; i++) {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c: i })]
    if (!cell.s) {
      cell.s = {}
    }
    if (!cell.s.font) {
      cell.s.font = {}
    }
    cell.s.font.bold = true
  }
  const wb = { Sheets: { data: ws }, SheetNames: ['Sheet'] }
  const excelBuffer = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
    cellStyles: true,
  })
  const finalData = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  FileSaver.saveAs(finalData, 'ChatLog.xlsx')
}
