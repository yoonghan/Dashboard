`use strict`

import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '../../../TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {INVENTORY_LINUX_SAMPLE} from '../../../../samples/inventory';
import {INVENTORY_WRITE_POLICY, INVENTORY_FORM_FACTOR, INVENTORY_MEMORY_TYPE} from '../../../../const/inventory';
import PanelTitleBar from "../../../PanelTitleBar";


const styles = (theme:Theme) => createStyles({
  root: {

  },
  content: {
    textAlign: "center"
  }
});

interface InventorySummaryProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

const InventorySummary: React.SFC<InventorySummaryProps> = ({classes, inventoryData}) => {
  const NOT_DEFINED = "UNKNOWN";

  function countMBeanByMBeanKey(searchMBeanKey: string) {
    const mbeans:Array<any> = inventoryData.system.mbean;
    const matchedMBean = mbeans.filter((mbean:any) => {
      return mbean.attr["@_cimclass"].indexOf(searchMBeanKey) > -1;
    });

    return matchedMBean.length;
  }

  function getMBeanByMBeanKey(searchMBeanKey: string) {
    const mbeans:Array<any> = inventoryData.system.mbean;
    const matchedMBean = mbeans.find((mbean:any) => {
      return mbean.attr["@_cimclass"].indexOf(searchMBeanKey) > -1;
    });

    return matchedMBean;
  }

  function getAttributeByAttributeKey(mbean:any, searchAttrKey: string) {
    const attributes:Array<any> = mbean.attribute;
    const matchedAttribute = attributes.find((attribute:any) => {
      return attribute.attr["@_id"].indexOf(searchAttrKey) > -1;
    });

    return matchedAttribute;
  }

  function getAttributeValueByMBeanKey(searchMBeanKey: string, searchAttrKey: string) {
    const matchedMBean = getMBeanByMBeanKey(searchMBeanKey);

    if(!matchedMBean || matchedMBean.length == 0) {
      return NOT_DEFINED;
    }

    const matchedAttribute = getAttributeByAttributeKey(matchedMBean, searchAttrKey);

    if(!matchedAttribute) {
      return NOT_DEFINED;
    }

    return matchedAttribute.attr["@_value"];
  }

  function OR(a:string, b:string) {
    if(!a || a === NOT_DEFINED) {
      return b;
    }
    return a;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.content}>
            <PanelTitleBar>
              Computer Information
            </PanelTitleBar>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Agent Type</TableCell>
                  <TableCell>{inventoryData.system.attr["@_agenttype"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IP Address</TableCell>
                  <TableCell>{inventoryData.system.attr["@_ipaddress"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Computer Name</TableCell>
                  <TableCell>{inventoryData.system.attr["@_name"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>OS Type</TableCell>
                  <TableCell>{inventoryData.system.attr["@_ostype"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Store Id</TableCell>
                  <TableCell>{inventoryData.system.attr["@_storeid"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Version</TableCell>
                  <TableCell>{inventoryData.system.attr["@_version"]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.content}>
                <PanelTitleBar>
                  Software Summary
                </PanelTitleBar>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Software Type</TableCell>
                      <TableCell>{inventoryData.system.attr["@_ostype"]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Software Version</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "Version")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Build Number</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "BuildNumber")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>System BIOS</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("BIOSElement", "Version")}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.content}>
                <PanelTitleBar>
                  Asset Summary
                </PanelTitleBar>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Manufacturer</TableCell>
                      <TableCell>{"-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Modal</TableCell>
                      <TableCell>{"-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>{"-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Architecture</TableCell>
                      <TableCell>{"-"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.content}>
                <PanelTitleBar>
                  Geographic Summary
                </PanelTitleBar>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Time Zone</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "CurrentTimeZone")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Code Set</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "CodeSet")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country Code</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "CountryCode")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Language Edition</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "OSLanguage")}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.content}>
                <PanelTitleBar>
                  Network Information
                </PanelTitleBar>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Hostname</TableCell>
                      <TableCell>{"-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IP Address</TableCell>
                      <TableCell>{inventoryData.system.attr["@_ipaddress"]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MAC Address</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("EthernetPort", "PermanentAddress")}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.content}>
                <PanelTitleBar>
                  Utilization Summary
                </PanelTitleBar>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Number of Processors</TableCell>
                      <TableCell>{countMBeanByMBeanKey("Processor")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Number of Cores</TableCell>
                      <TableCell>
                        {
                          OR(
                            getAttributeValueByMBeanKey("Processor", "NumberOfEnabledCores"),
                            getAttributeValueByMBeanKey("Processor", "NumberOfCores")
                          )
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Max Processor Speed</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("Processor", "MaxClockSpeed")} MHz</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Processor Family</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("Processor", "Name")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Physical Memory</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "TotalVisibleMemorySize")} KB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Virtual Memory</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "TotalVirtualMemorySize")} KB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Free Physical Memory</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "FreePhysicalMemory")} KB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Free Virtual Memory</TableCell>
                      <TableCell>{getAttributeValueByMBeanKey("OperatingSystem", "FreeVirtualMemory")} KB</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(InventorySummary);
