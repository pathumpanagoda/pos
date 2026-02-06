import type { CartItem } from '../types';

interface ReceiptData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paid: number;
  change: number;
  date: Date;
}

export const printReceipt = (data: ReceiptData) => {
  const { items, subtotal, tax, total, paid, change, date } = data;

  const receiptContent = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: 'Courier New', monospace; font-size: 12px; margin: 0; padding: 0; width: 80mm; }
          .header { text-align: center; margin-bottom: 10px; }
          .store-name { font-size: 16px; font-weight: bold; }
          .divider { border-top: 1px dashed #000; margin: 5px 0; }
          .item-row { display: flex; justify-content: space-between; }
          .details { margin-top: 10px; }
          .totals-row { display: flex; justify-content: space-between; font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; font-size: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="store-name">POS System</div>
          <div>123 Main Street</div>
          <div>Tel: 555-0123</div>
          <br />
          <div>${date.toLocaleString()}</div>
          <div>Trans #: ${Math.floor(Math.random() * 100000)}</div>
        </div>
        
        <div class="divider"></div>
        
        <div>
          ${items.map(item => `
            <div style="margin-bottom: 4px;">
              <div>${item.name}</div>
              <div class="item-row">
                <span>${item.quantity} x ${item.price.toFixed(2)}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="divider"></div>
        
        <div class="details">
          <div class="item-row"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
          <div class="item-row"><span>Tax:</span><span>${tax.toFixed(2)}</span></div>
          <div class="totals-row" style="margin: 5px 0; font-size: 14px;">
            <span>TOTAL:</span><span>${total.toFixed(2)}</span>
          </div>
          <div class="divider"></div>
          <div class="item-row"><span>Cash Paid:</span><span>${paid.toFixed(2)}</span></div>
          <div class="item-row"><span>Change:</span><span>${change.toFixed(2)}</span></div>
        </div>
        
        <div class="footer">
          <div>Thank you for your purchase!</div>
          <div>Please come again.</div>
        </div>
      </body>
    </html>
  `;

  // Check for Electron API
  if ((window as any).electronAPI) {
    (window as any).electronAPI.printReceipt(receiptContent);
  } else {
    // Fallback for browser (Show dialog)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(receiptContent);
      doc.close();
       
       // Inject print script for fallback
       const script = doc.createElement('script');
       script.textContent = 'window.onload = function() { window.print(); window.close(); }';
       doc.body.appendChild(script);

      setTimeout(() => {
          document.body.removeChild(iframe);
      }, 1000);
    }
  }
};

