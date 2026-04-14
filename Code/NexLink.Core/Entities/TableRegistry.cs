using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("TableRegistry")]
public partial class TableRegistry
{
    [Column("TableName")]
    [StringLength(255)]
    public required string TableName { get; set; }

    [Column("IsMaintenance")]
    public bool IsMaintenance { get; set; }

    [Column("DisplayName")]
    [StringLength(128)]
    public string DisplayName { get; set; } = null!;
}
