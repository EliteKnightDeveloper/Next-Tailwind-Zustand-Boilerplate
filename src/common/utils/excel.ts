import xlsx from 'xlsx-populate'
import { saveAs } from 'file-saver'

function getSheetData(data: any[], header: string[]): any {
  var fields = Object.keys(data[0])
  var sheetData = data.map(function (row) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : ''
    })
  })
  sheetData.unshift(header)
  return sheetData
}

export const exportChatLogs = (data: any[]) => {
  const headers = [
    'Channel',
    'Agent',
    'Start Time',
    'End Time',
    'Interaction Time',
    'Customer Message',
    'Agent Message',
  ]

  xlsx.fromBlankAsync().then(async (workbook) => {
    const sheet = workbook.sheet(0)
    const sheetData = getSheetData(data, headers)
    const totalColumns = sheetData[0].length

    sheet.cell('A1').value(sheetData)
    sheet.cell('A1').column().width(20)
    sheet.cell('B1').column().width(15)
    sheet.cell('C1').column().width(20)
    sheet.cell('D1').column().width(20)
    sheet.cell('E1').column().width(20)
    sheet.cell('F1').column().width(50)
    sheet.cell('G1').column().width(50)

    const range = sheet.usedRange()
    const endColumn = String.fromCharCode(64 + totalColumns)
    sheet.row(1).style('bold', true)
    sheet.range('A1:' + endColumn + '1').style('fill', 'BFBFBF')
    range?.style('border', true)

    return workbook.outputAsync().then((res: any) => {
      saveAs(res, 'Conversations.xlsx')
    })
  })
}
