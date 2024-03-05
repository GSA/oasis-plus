/*
 * The purpose of this is to process customized markdown tables that allow
 * markdown authors to indicate the row-scoped headers. This is done by including
 * a `#` followed by a space as the first characters of the first cell in a row, 
 * for example:
 * 
 * |  header_1  |  header_2  |
 * | ---------- | ---------- |
 * |# row head  | normal td  |
 * 
 * This would result in a table row:
 * <tr>
 *  <th scope="row">row head</th>
 *  <td>normal td</td>
 * </tr
 * 
 */


import {visit} from 'unist-util-visit'


function process_table_row(node) {
    let tds = node.children.filter(child => child.type == 'element' && child.tagName == 'td');
    if (tds.length == 0) return

    let td = tds[0];
    if (td.children.length == 0) return
    let first_node = td.children[0]
    
    if (first_node.type == 'text' && first_node.value.startsWith('# ')) {
        td.tagName = 'th'
        first_node.value = first_node.value.slice(2)
        if (!td.properties) {
            td.properties = {};
        }
        td.properties.scope = 'row'
    } 
}


export default () => {
  return tree => {
    visit(tree, [{"type": "element", "tagName": "tr"}], function (node) {
        process_table_row(node)
      })
    }
};
