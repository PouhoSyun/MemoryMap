#!/bin/bash

# Memory Map - Automatic Backup Script
# Usage: ./backup.sh
# Add to crontab for automatic backups: 0 2 * * * /opt/memory-map/backup.sh

set -e

PROJECT_DIR="/opt/memory-map"
DATA_DIR="$PROJECT_DIR/data"
BACKUP_DIR="/opt/backups/memory-map"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Memory Map Backup Started ===${NC}"
echo "Time: $(date)"
echo "Source: $DATA_DIR"
echo "Destination: $BACKUP_FILE"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create backup
if tar -czf "$BACKUP_FILE" -C "$PROJECT_DIR" data/; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo "  Size: $SIZE"

    # Keep only last 30 backups
    BACKUP_COUNT=$(ls "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | wc -l)
    if [ "$BACKUP_COUNT" -gt 30 ]; then
        echo -e "${YELLOW}Cleaning old backups (keeping 30 recent)...${NC}"
        ls -t "$BACKUP_DIR"/backup_*.tar.gz | tail -n +31 | xargs rm -f
    fi

    # Log backup event
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Backup completed: $BACKUP_FILE ($SIZE)" >> "$PROJECT_DIR/data/logs/backup.log"

    echo -e "${GREEN}=== Backup Completed Successfully ===${NC}"
else
    echo -e "${RED}✗ Backup failed${NC}"
    exit 1
fi
