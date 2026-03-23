#!/bin/bash
# Setup deploy user for kidslab.de Hugo beta deployment
# Run as root on the Ubuntu server

set -e

USER="deploy-kidslabde"
HOME_DIR="/home/$USER"

echo "=== Creating user $USER ==="
useradd -m -s /bin/bash "$USER"

echo "=== Setting password (required for SSH key auth) ==="
passwd "$USER"

echo "=== Setting up SSH key ==="
mkdir -p "$HOME_DIR/.ssh"
chmod 700 "$HOME_DIR/.ssh"
touch "$HOME_DIR/.ssh/authorized_keys"
chmod 600 "$HOME_DIR/.ssh/authorized_keys"
chown -R "$USER:$USER" "$HOME_DIR/.ssh"

echo ""
echo ">>> Paste the PUBLIC SSH key for $USER now (then Ctrl+D):"
cat >> "$HOME_DIR/.ssh/authorized_keys"

echo "=== Adding to docker group ==="
usermod -aG docker "$USER"

echo "=== Creating deployment directory ==="
mkdir -p /opt/kidslab-beta
chown "$USER:$USER" /opt/kidslab-beta

echo "=== GHCR Login ==="
echo ">>> You need a GitHub PAT with read:packages scope"
su - "$USER" -c "docker login ghcr.io -u KidsLabDe"

echo ""
echo "=== Done! ==="
echo ""
echo "Now add these GitHub Secrets to KidsLabDe/kidslab.de:"
echo "  SERVER_HOST     → $(hostname -I | awk '{print $1}')"
echo "  SERVER_USER     → $USER"
echo "  SERVER_SSH_KEY  → (the PRIVATE key matching the public key above)"
