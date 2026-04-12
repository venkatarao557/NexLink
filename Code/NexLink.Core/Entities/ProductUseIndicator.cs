using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("ProductUseIndicator")]
[Index("UseCode", Name = "UQ_ProdUse_Code", IsUnique = true)]
public partial class ProductUseIndicator
{
    [Key]
    [Column("ProductUseID")]
    public Guid ProductUseId { get; set; }

    [StringLength(1)]
    [Unicode(false)]
    public string UseCode { get; set; } = null!;

    [StringLength(100)]
    public string Description { get; set; } = null!;
}
