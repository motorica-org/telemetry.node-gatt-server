# This script makes the adjustments necessary for bleno (the BLE stack underneath to work)
# It has to be run with root rights
# See https://github.com/sandeepmistry/bleno#linux for details

# disable bluetoothd
sudo systemctl stop bluetooth

# enable BT adapter
sudo hciconfig hci0 up

# grant node the privilege of manipulating raw sockets
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
