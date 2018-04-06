
This script turns qstat XML into a graphite metrics output.

## Installation

First create a cron job that loads desired qstat output.

> 0 0 0 0 0 ssh hayashis@carbonate.uits.iu.edu qstat -u hayashis -f -x > /tmp/qstat.xml

Then, run the script

> ./sensu-pbs-qstat-metrics.js /tmp/qstat.xml test.carbonate.stat

For sensu, you can do something like..

```
{
    "checks": {
        "metrics-amaretti": {
            "type": "metric",
            "command": "/somewhere/sensu-pbs-qstat-metrics.js /tmp/qstat.xml dev.qstat",
            "standalone": true,
            "interval": 60,
            "handlers": ["graphite"]
        }
    }
}
```
