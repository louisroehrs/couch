	Perl script and compiled Perl script examples

Usage: UU <Host>[:port] <login:password> <[n]{on|off|pulse|status|power|name}|runNNN|interact>

Examples: 
// Turn outlet 5 on
UU 192.168.0.100:80 admin:1234 5on

// See the status of the outlets
UU 192.168.0.100:80 admin:1234 status

// Turn all outlets on, and outlet 4 off
UU 192.168.0.100:80 admin:1234 on 4off

// See the names of the outlets, the status, turn all on and 4 off, see the status again
UU lpc.digital-loggers.com admin:4321 name status on 4off status

// Run a script starting at line 10, see the outlet names and status
UU lpc.digital-loggers.com admin:4321 run010 name status
