
This script turns qstat XML into a graphite metrics output.

## Installation

First create a cron job that loads desired qstat output.

> * * * * * ssh whoever@somewhere.edu qstat -u whoever -f -x > /tmp/qstat.xml

Then, git clone this repo somewhere (if you are going to run it via sensu, make sure sensu can read to it)

```
git clone <this>
cd sensu-pbs-qstat-metrics && npm install
```

Lastly, run sensu-pbs-qstat-metrics.js to generate the metrics.

> ./sensu-pbs-qstat-metrics.js /tmp/qstat.xml test.somewhere.stat

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
