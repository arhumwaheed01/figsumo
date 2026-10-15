---
url: /ip-subnet-calculator
title: "IP Subnet Calculator (IPv4 and IPv6) | FigSumo"
description: "Calculate network and broadcast addresses, usable host range, subnet mask and wildcard for any IPv4 or IPv6 address and prefix length."
h1: "IP Subnet Calculator"
country: global
status: keep
body_words: 626 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: IP Subnet Calculator
Setting up a home lab, configuring a router or studying for a networking exam? This calculator takes an IPv4 address and a CIDR prefix length and returns the network address, subnet mask, broadcast address, usable host range and number of addresses.
How to use this calculator
1. IPv4 address: four numbers from 0 to 255 separated by dots (default 192.168.1.10).
2. CIDR prefix (/n): 0 to 32, the number of leading 1 bits in the mask (default 24).
Results: network address, subnet mask, broadcast address, first host, last host, total addresses and usable host addresses.
How subnetting works
An IPv4 address is 32 bits. The prefix length splits it into a network part (the first n bits) and a host part (the remaining 32 − n bits).
mask = n ones followed by (32 − n) zeros
network = address AND mask
broadcast = network OR (NOT mask)
total addresses = 2^(32 − n)
usable hosts = total − 2         (network and broadcast reserved)
Special cases: a /31 has 2 usable addresses (point-to-point links, RFC 3021) and a /32 is a single host.
Worked examples
Example 1: a home network (the default)
192.168.1.10/24:
Result
Value
Network
192.168.1.0
Mask
255.255.255.0
Broadcast
192.168.1.255
Hosts
192.168.1.1 – 192.168.1.254
Total / usable
256 / 254
Example 2: a /20
10.0.5.77/20 → network 10.0.0.0, mask 255.255.240.0, broadcast 10.0.15.255, hosts 10.0.0.1 – 10.0.15.254, 4,096 addresses (4,094 usable).
Example 3: a small office segment
172.16.40.200/27 → network 172.16.40.192, mask 255.255.255.224, broadcast 172.16.40.223, hosts 172.16.40.193 – 172.16.40.222 (30 usable).
Example 4: a point-to-point link
203.0.113.9/30 → network 203.0.113.8, hosts 203.0.113.9 and 203.0.113.10, broadcast 203.0.113.11: exactly two usable addresses, the traditional choice for a router-to-router link.
Common prefixes
Prefix
Mask
Addresses
Usable
/8
255.0.0.0
16,777,216
16,777,214
/16
255.255.0.0
65,536
65,534
/22
255.255.252.0
1,024
1,022
/24
255.255.255.0
256
254
/26
255.255.255.192
64
62
/28
255.255.255.240
16
14
/30
255.255.255.252
4
2
Private address ranges (RFC 1918)
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
These aren't routed on the public internet; home routers use them behind NAT. 100.64.0.0/10 is reserved for carrier-grade NAT, and 169.254.0.0/16 is link-local (often a sign that DHCP failed).
Understanding your results
Any address in the subnet gives the same network and broadcast; the calculator works out which subnet the address belongs to.
Cloud providers reserve extra addresses: AWS reserves 5 per subnet, so a /24 VPC subnet has 251 usable [VERIFY current provider docs].
Binary view: the mask 255.255.240.0 is 11111111.11111111.11110000.00000000. The binary calculator helps you check.
Tips and common mistakes
Assigning the network or broadcast address to a device.
Overlapping subnets when planning; each subnet's range must be distinct.
Confusing the mask with the wildcard (inverse) mask used in Cisco ACLs: 0.0.0.255 for a /24.
Typing a leading zero like 192.168.01.10, which some systems read as octal.
Notes for US, Canada and UK users
Subnetting rules are the same everywhere because IPv4 and CIDR are international standards. Regional internet registries hand out public address space: ARIN covers the US and Canada, and RIPE NCC covers the UK and Europe. Home routers sold in all three countries usually default to a 192.168.x.0/24 or 10.0.0.0/24 network, which the calculator's default reproduces.
Frequently asked questions
How many hosts are in a /24?
254 usable out of 256.
What is a subnet mask?
A 32-bit value marking the network part of an address.
What does /24 mean?
The first 24 bits are the network; 8 bits are for hosts.
Why are two addresses unusable?
The network and broadcast addresses are reserved.
What is a /31 used for?
Point-to-point links, with two usable addresses.
Does it support IPv6?
Not yet.
Related calculators
Binary Calculator
Hex Calculator
Download Time Calculator
Base64 Encoder and Decoder
URL Encoder and Decoder
Password Generator
Sources
1. IETF RFC 4632: "Classless Inter-domain Routing (CIDR)" (accessed 14 Oct 2026). https://www.rfc-editor.org/rfc/rfc4632
2. IETF RFC 1918: "Address Allocation for Private Internets" (accessed 14 Oct 2026). https://www.rfc-editor.org/rfc/rfc1918
3. IETF RFC 3021: "Using 31-Bit Prefixes on IPv4 Point-to-Point Links" (accessed 14 Oct 2026). https://www.rfc-editor.org/rfc/rfc3021
4. FigSumo methodology.
