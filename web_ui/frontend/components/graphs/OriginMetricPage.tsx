import { Box, Grid, Paper, Typography } from '@mui/material';
import { green, grey, blue } from '@mui/material/colors';

import {
  ProjectTable,
  TransferRateGraph,
  CPUGraph,
  MemoryGraph,
  BigBytesMetric,
  BigMetric,
  StorageGraph,
} from '@/components/metrics';

import { buildMetric as bm } from '@/components/graphs/prometheus';

export const OriginMetricPage = ({
  server_name = undefined,
}: {
  server_name?: string;
}) => {
  return (
    <Grid container spacing={1} direction={'row'}>
      <Grid item xs={12} md={4} display={'flex'}>
        <Grid
          container
          spacing={1}
          justifyContent={'space-between'}
          flexGrow={1}
        >
          {[
            <ProjectTable key={'project-table'} server_name={server_name} />,
            <BigBytesMetric
              key={'rx'}
              metric={bm('xrootd_server_bytes', {
                direction: 'rx',
                server_name,
              })}
              title={'Bytes Received'}
              color={green[300]}
            />,
            <BigBytesMetric
              key={'tx'}
              metric={bm('xrootd_server_bytes', {
                direction: 'tx',
                server_name,
              })}
              title={'Bytes Transferred'}
              color={green[300]}
            />,
            <StorageGraph key={'storage-graph'} />,
          ].map((component, index) => (
            <Grid key={index} item xs={12} display={'flex'} height={'21vh'}>
              <Paper sx={{ width: '100%' }}>{component}</Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid
          container
          spacing={1}
          justifyContent={'space-between'}
          flexGrow={1}
        >
          <Grid item xs={12} display={'flex'} height={'28vh'}>
            <Paper sx={{ flexGrow: 1 }}>
              <TransferRateGraph server_name={server_name} />
            </Paper>
          </Grid>
          <Grid item xs={12} display={'flex'} height={'28vh'}>
            <Paper sx={{ flexGrow: 1 }}>
              <CPUGraph server_name={server_name} />
            </Paper>
          </Grid>
          <Grid item xs={12} display={'flex'} height={'28vh'}>
            <Paper sx={{ flexGrow: 1 }}>
              <MemoryGraph server_name={server_name} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Box p={1} bgcolor={grey[200]} borderRadius={1}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <BigMetric
                      title={'Pelican Threads'}
                      finalType={'last'}
                      metric={bm('go_threads', { server_name })}
                      color={green[300]}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <BigMetric
                      title={'XRootD Running Threads'}
                      finalType={'last'}
                      metric={bm('xrootd_sched_thread_count', {
                        state: 'running',
                        server_name,
                      })}
                      color={blue[200]}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <BigMetric
                      title={'XRootD Idle Threads'}
                      metric={bm('xrootd_sched_thread_count', {
                        state: 'idle',
                        server_name,
                      })}
                      finalType={'last'}
                      color={grey[400]}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <BigBytesMetric
                      metric={bm('xrootd_transfer_bytes', {
                        type: 'read',
                        server_name,
                      })}
                      title={'Bytes `read`'}
                      finalType={'sum'}
                      color={green[300]}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <BigBytesMetric
                      metric={bm('xrootd_transfer_bytes', {
                        type: 'readv',
                        server_name,
                      })}
                      title={'Bytes `readv'}
                      finalType={'sum'}
                      color={green[300]}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <BigBytesMetric
                      metric={bm('xrootd_transfer_bytes', {
                        type: 'write',
                        server_name,
                      })}
                      title={'Bytes `write`'}
                      finalType={'sum'}
                      color={green[300]}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <BigMetric
                  title={'Go Routines'}
                  finalType={'last'}
                  metric={bm('go_goroutines', { server_name })}
                  color={green[300]}
                />
              </Grid>
              <Grid item xs={6}>
                <BigMetric
                  title={'XRootD Server Connections'}
                  metric={bm('xrootd_server_connection_count', { server_name })}
                  finalType={'last'}
                  color={green[300]}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OriginMetricPage;
